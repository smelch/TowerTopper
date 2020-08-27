using System;
using System.Linq;

namespace TowerTopper.Domain.Rooms
{
    public class RoomCode
    {
        private static Random _random = new Random();
        private readonly string _value;

        private RoomCode(string value)
        {
            _value = value;
        }

        public static bool TryParse(string value, out RoomCode output, out string error)
        {
            output = null;
            if (IsInvalid(value, out error))
            {
                return false;
            }

            output = new RoomCode(value);

            return true;
        }

        public static RoomCode NewRoomCode()
        {
            return new RoomCode(GenerateRoomCode());
        }

        private static string GenerateRoomCode()
        {
            return new string(Enumerable.Range(0, 4).Select(_ => GenerateRandomLetter()).ToArray());
        }

        private static char GenerateRandomLetter()
        {
            return (char)_random.Next(65, 90);
        }

        private static bool IsInvalid(string value, out string error)
        {
            if (String.IsNullOrWhiteSpace(value))
            {
                error = "Value cannot be null or whitespace";
                return true;
            }

            if(value.Length != 4)
            {
                error = "Value must be exactly four characters";
                return true;
            }

            if(value.Any(x => !char.IsLetter(x)))
            {
                error = "Value must contain only letters";
                return true;
            }

            error = null;
            return false;
        }

        public static bool operator ==(RoomCode a, RoomCode b)
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

        public static bool operator !=(RoomCode a, RoomCode b)
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

        public bool Equals(RoomCode b)
        {
            return b != null && this._value == b._value;
        }

        public override bool Equals(object obj)
        {
            if (obj is RoomCode b)
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