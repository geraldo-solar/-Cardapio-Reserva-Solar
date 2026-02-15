import re

with open('Cardápio Hotel Solar/index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Regex to find data-i18n="key">Text content<
# This is a bit simplistic, might miss nested tags or newlines, but good enough for a start
pattern = r'data-i18n="([^"]+)"[^>]*>([^<]+)<'
matches = re.findall(pattern, html_content)

print("const translations = {")
print("  pt: {")
for key, text in matches:
    text = text.strip()
    print(f'    "{key}": "{text}",')
print("  },")
print("  en: {}, es: {}, fr: {}, it: {}")
print("};")
