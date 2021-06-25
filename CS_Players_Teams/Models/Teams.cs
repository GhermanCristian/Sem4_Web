namespace CS_Name_NoAng.Models {
    public class Teams {
        public Teams(int captainID, string name, string description, string members) {
            this.ID = 0;
            this.name = name;
            this.captainID = captainID;
            this.description = description;
            this.members = members;
        }
        public int ID { get; set; }
        public int captainID { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string members { get; set; }
    }
}
