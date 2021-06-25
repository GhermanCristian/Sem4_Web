namespace CS_Name_NoAng.Models {
    public class Players {
        public Players(string name, int age) {
            this.ID = 0;
            this.name = name;
            this.age = age;
        }
        public int ID { get; set; }
        public string name { get; set; }
        public int age { get; set; }
    }
}
