import os
import re

notes_dir = r'c:\Users\mateo\astro-project-v2\src\content\notes'
pattern = re.compile(r'^vocabulary:.*$', re.MULTILINE)

for filename in os.listdir(notes_dir):
    if filename.endswith('.md'):
        filepath = os.path.join(notes_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = pattern.sub('', content)
        # Remove potential double newlines left behind
        new_content = new_content.replace('\n\n\n', '\n\n')
        
        # Strip trailing whitespace on lines and ensure no accidental empty lines at top/bottom if necessary
        # But specifically we just want to remove that line.
        
        # If the line was in the middle of frontmatter, it might leave an empty line.
        lines = content.splitlines()
        new_lines = [line for line in lines if not line.strip().startswith('vocabulary:')]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write('\n'.join(new_lines) + '\n')

print("Finished cleaning up vocabulary from notes.")
