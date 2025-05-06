// src/utils/simple-types.ts
export const SIMPLE_TYPES = new Set<string>([
    "bool", "char", "signed char", "unsigned char", "wchar_t", "char8_t", "char16_t", "char32_t",
    "short", "unsigned short", "int", "unsigned int", "long", "unsigned long",
    "long long", "unsigned long long", "float", "double", "long double",
    "std::string", "std::wstring", "nullptr_t"
]);

export const ARRAY_TYPES = new Set<string>([
    "std::array", "std::vector", "std::deque", "std::list", "std::set", "std::map",
    "std::unordered_set", "std::unordered_map", "std::bitset", "std::valarray",
    "std::forward_list", "std::queue", "std::stack", "std::priority_queue", "std::multiset",
    "std::multimap", "std::unordered_multiset", "std::unordered_multimap", "std::array_view",
    "std::span"
]);

  