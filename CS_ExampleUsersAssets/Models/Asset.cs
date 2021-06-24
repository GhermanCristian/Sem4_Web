namespace CS_ExampleUsersAssets.Models {
    public class Asset {
        public Asset(string name, string description, int value) {
            this.ID = 0;
            this.userID = 0;
            this.name = name;
            this.description = description;
            this.value = value;
        }
        public int ID { get; set; }
        public int userID { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int value { get; set; }
    }
}
