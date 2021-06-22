using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public String JobTitle { get; set; }
        public int YearsOfExperience { get; set; }
        public string PreviousEmployer { get; set; }
        public string CurrentEmployer { get; set; }
        virtual public ICollection<Skill> Skills { get; set; } = new HashSet<Skill>();
    }
}
