"""Builds the claude.ai artifact copy of the tracker.

The artifact host adds its own <!doctype>, <html>, <head> and <body>, so this
strips them from app/index.html. Publish the output with app/data.js attached
as "data.js".

Usage: python3 scripts/build-artifact.py OUTPUT_PATH
"""
import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
page = (root / "app" / "index.html").read_text()
page = re.sub(r'<!doctype html>\s*<html[^>]*>\s*<head>\s*<meta charset="utf-8">\s*<meta name="viewport"[^>]*>\s*', "", page)
page = page.replace("</head>\n<body>\n", "").replace("</body>\n</html>\n", "")
Path(sys.argv[1]).write_text(page)
