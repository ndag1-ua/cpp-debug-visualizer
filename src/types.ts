// src/utils/simple-types.ts
export const SIMPLE_TYPES = new Set<string>([
    "bool", "char", "signed char", "unsigned char", "wchar_t", "char8_t", "char16_t", "char32_t",
    "short", "unsigned short", "int", "unsigned int", "long", "unsigned long",
    "long long", "unsigned long long", "float", "double", "long double",
    "std::string", "std::wstring", "const char*", "char[]", "nullptr_t"
  ]);
  