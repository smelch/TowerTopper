using System;
using System.Collections.Generic;
using System.Text;

namespace TowerTopper.Domain.Characters
{
    public class Character
    {
        private static Dictionary<CharacterKey, Character> _characters = new Dictionary<CharacterKey, Character>()
        {
            { CharacterKey.Dan, new Character() }
        };
        
        public static Character Get(CharacterKey key)
        {
            return _characters[key];
        }


        protected Character()
        {

        }
    }
}
