using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProfilesController : ControllerBase
    {
        private readonly ProfileContext _context;

        public ProfilesController(ProfileContext context)
        {
            _context = context;
        }

        // GET: api/Profiles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Profile>>> GetProfiles()
        {
            return await _context.Profiles.Include(P => P.Skills).ToListAsync();
        }

        // GET: api/Profiles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Profile>> GetProfile(int id)
        {
            var profile = await _context.Profiles.Include(P => P.Skills).FirstOrDefaultAsync(P => P.Id == id);

            if (profile == null)
            {
                return NotFound();
            }

            return profile;
        }

        // PUT: api/Profiles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProfile(int id, Profile profile)
        {
            if (id != profile.Id)
            {
                return BadRequest();
            }
            
            //_context.Entry(profile).State = EntityState.Modified;



            var existingProfile = await _context.Profiles.Where(p => p.Id == id).Include(p => p.Skills).FirstOrDefaultAsync();

            if (existingProfile == null)
            {
                return BadRequest();
            }

           
            try
            {
                _context.Entry(existingProfile).CurrentValues.SetValues(profile);

                foreach (var existingChild in existingProfile.Skills.ToList())
                {
                    if (!profile.Skills.Any(c => c.Id == existingChild.Id))
                        _context.Skills.Remove(existingChild);
                }

                foreach (var childModel in profile.Skills)
                {
                    var existingChild = existingProfile.Skills
                        .Where(c => c.Id == childModel.Id && c.Id != default(int))
                        .SingleOrDefault();

                    if (existingChild != null)
                        // Update child
                        _context.Entry(existingChild).CurrentValues.SetValues(childModel);
                    else
                    {
                        // Insert child
                        var newChild = new Skill
                        {
                            SkillName = childModel.SkillName
                        };
                        existingProfile.Skills.Add(newChild);
                    }
                }

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfileExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Profiles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Profile>> PostProfile(Profile profile)
        {
            _context.Profiles.Add(profile);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProfile", new { id = profile.Id }, profile);
        }

        // DELETE: api/Profiles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfile(int id)
        {
            var profile = await _context.Profiles.FindAsync(id);
            if (profile == null)
            {
                return NotFound();
            }

            _context.Profiles.Remove(profile);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProfileExists(int id)
        {
            return _context.Profiles.Any(e => e.Id == id);
        }
    }
}
