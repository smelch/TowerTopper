using System;

namespace TowerTopper.Domain.Rooms
{
    public class RoomId
    {
        private readonly Guid _value;

        protected RoomId(Guid value)
        {
            _value = value;
        }

        public static RoomId Parse(string value)
        {
            return new RoomId(Guid.Parse(value));
        }

        public static RoomId NewRoomId()
        {
            return new RoomId(Guid.NewGuid());
        }

        public static bool operator ==(RoomId a, RoomId b)
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

        public static bool operator !=(RoomId a, RoomId b)
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

        public bool Equals(RoomId b)
        {
            return b != null && this._value == b._value;
        }

        public override bool Equals(object obj)
        {
            if (obj is RoomId b)
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
            return _value.ToString();
        }
    }
}