namespace Services.Authentication
{
    public interface IHash
    {
        string Create(string value, string salt);
        bool Validate(string value, string salt, string hash);
    }
}