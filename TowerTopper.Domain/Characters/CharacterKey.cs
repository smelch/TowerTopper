using System;
using System.Collections.Generic;
using System.Text;

namespace TowerTopper.Domain.Characters
{
    public class CharacterKey
    {
        public static CharacterKey Ernie = new CharacterKey("ernie");
        public static CharacterKey Mark = new CharacterKey("mark");
        public static CharacterKey Dan = new CharacterKey("dan");

        private readonly string _value;
        protected CharacterKey(string key)
        {
            _value = key;
        }

        public static CharacterKey Parse(string key)
        {
            switch (key.ToLower())
            {
                case "ernie":
                    return Ernie;
                case "dan":
                    return Dan;
                case "mark":
                    return Mark;
            }

            throw new ArgumentException("Cannot parse key", nameof(key));
        }


    }
}
