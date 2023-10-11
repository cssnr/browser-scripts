import os
import re
from jinja2 import Environment, FileSystemLoader
from pathlib import Path
from typing import Dict, Union

template_file = 'README.md.jinja'

base_dir = Path(__file__).parent.resolve()
top_dir = base_dir.parent.resolve()


def get_data_from_path(path: Union[Path, str]) -> Dict[str, dict]:
    data = {}
    for directory in os.listdir(path):
        if directory.startswith('.'):
            continue
        dir_path = os.path.join(path, directory)
        if not os.path.isdir(dir_path):
            continue
        print(f'processing: dir_path: {dir_path}')
        for filename in os.listdir(dir_path):
            if '.user.js' in filename.lower():
                print(f'processing: filename: {filename}')
                meta = {}
                with open(os.path.join(dir_path, filename), 'r') as f:
                    for line in f:
                        match = re.match('^\s*?\/\/\s*?@(\w+)\s*(.*)', line)
                        if match:
                            key = match.group(1)
                            value = match.group(2)
                            if key and value:
                                meta[key.lower()] = value
                                # print(f'{key} - {value}')
                meta['dir'] = os.path.basename(dir_path)
                data[filename] = meta
    return data


if __name__ == '__main__':
    print(f'base_dir: {base_dir}')
    print(f'top_dir: {top_dir}')

    all_data: Dict[str, dict] = get_data_from_path(top_dir)
    print(f'all_data: {all_data}')
    env = Environment(loader=FileSystemLoader(base_dir))
    template = env.get_template(template_file)
    rendered = template.render({'all_data': all_data})

    with open(top_dir / 'README.md', 'w', encoding='utf-8', newline='\n') as f:
        f.write(rendered)
        print(f'Generated: {f.name}')
