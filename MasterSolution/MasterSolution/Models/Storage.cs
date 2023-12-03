namespace MasterSolution.Models
{
    public class Storage
    {
        public static string value = "default";
        public int id = 0;

        public static void SetValue(string storeVlaue)
        {
            value = storeVlaue;
        }

        public static string GetValue() 
        { 
            return value;
        }
    }
}
