using System;
using System.Collections.Generic;
using System.Text;

namespace TowerTopper.Domain.Players
{
    public class PlayerId
    {
        private readonly string _value;

        public PlayerId(string value)
        {
            _value = value;
        }

        public static bool operator ==(PlayerId a, PlayerId b)
        {
            if (ReferenceEquals(a, b))
            {
                return true;
            }

            if (a is null)
            {
                return false;
            }

            return a.Equals(b);
        }

        public static bool operator !=(PlayerId a, PlayerId b)
        {
            if (ReferenceEquals(a, b))
            {
                return false;
            }

            if (a is null)
            {
                return true;
            }

            return !a.Equals(b);
        }

        public bool Equals(PlayerId b)
        {
            return b != null && this._value == b._value;
        }

        public override bool Equals(object obj)
        {
            if (obj is PlayerId b)
            {
                return Equals(b);
            }

            return false;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(_value);
        }

        public override string ToString()
        {
            return _value;
        }
    }
}
