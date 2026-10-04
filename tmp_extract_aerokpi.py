from pypdf import PdfReader
from pathlib import Path
pdf = Path(r'public/project assets/AeroKpi Forge/paper/rapport_walid_benmaarouf.pdf')
reader = PdfReader(str(pdf))
print('pages', len(reader.pages))
for i, page in enumerate(reader.pages[:10], 1):
    text = page.extract_text() or ''
    print(f'--- PAGE {i} ---')
    print(text[:2500])
    print()
