namespace CS_ExampleUsersAssets.Models {
    public class User {
        public int ID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        override
        public string ToString() {
            return ID.ToString() + " | " + Username + " | " + Password + "\n";
        }
    }
}
