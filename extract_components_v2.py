#!/usr/bin/env python3
import re
import os

# Read the entire file
with open('/Users/shenzhengyi/Codes/aha_starter/src/styles/design-system/templates/components.css', 'r') as f:
    lines = f.readlines()

# Find all component headers with their line numbers
component_headers = []
header_pattern = re.compile(r'^/\* =+$')
component_name_pattern = re.compile(r'^\s+(.+?)(?:\s+COMPONENT)?\s*$')

i = 0
while i < len(lines):
    if header_pattern.match(lines[i]):
        # Found a header, check if next line is component name
        if i + 1 < len(lines):
            name_match = component_name_pattern.match(lines[i + 1])
            if name_match and i + 2 < len(lines) and header_pattern.match(lines[i + 2]):
                component_name = name_match.group(1).strip()
                component_headers.append((i, component_name))
    i += 1

# Add end of file as last boundary
component_headers.append((len(lines), "END"))

# Extract each component
for idx in range(len(component_headers) - 1):
    start_line, component_name = component_headers[idx]
    end_line, _ = component_headers[idx + 1]
    
    # Skip utility classes and layout utilities
    if 'UTILITY' in component_name or 'LAYOUT UTILITIES' in component_name:
        continue
    
    # Create clean filename
    filename = component_name.lower()
    filename = re.sub(r'\s+component$', '', filename, flags=re.IGNORECASE)
    filename = re.sub(r'[^a-z0-9]+', '-', filename)
    filename = filename.strip('-')
    
    # Handle special cases and duplicates
    if filename == 'form':
        continue  # Skip generic form header
    elif filename == 'form-s':
        continue  # Skip malformed names
    elif filename == 'image-gallery':
        # Check if this is the first or second occurrence
        if start_line < 4000:
            filename = 'image-gallery'
        else:
            filename = 'image-gallery-advanced'
    elif filename == 'date-picker' and start_line > 3800:
        filename = 'date-picker-advanced'
    
    # Extract component content
    component_lines = lines[start_line:end_line]
    
    # Remove trailing empty lines
    while component_lines and component_lines[-1].strip() == '':
        component_lines.pop()
    
    # Create the component file
    file_path = f'/Users/shenzhengyi/Codes/aha_starter/src/styles/components/{filename}.css'
    
    with open(file_path, 'w') as f:
        # Write header
        f.write(f"""/* 
 * {component_name.title()}
 * Part of the AHA Starter Design System
 * This file contains styles for the {component_name.lower()}
 */

""")
        # Write the component content
        f.writelines(component_lines)
    
    print(f"Created: {filename}.css for {component_name}")

# Clean up temporary files
os.remove('/Users/shenzhengyi/Codes/aha_starter/extract_components.py')

print("\nExtraction complete!")