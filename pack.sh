(
echo "📁 FIL- OG MAPPESTRUKTUR:"
find . -type d \( -name .git -o -name node_modules -o -name dist -o -name '.svelte-kit' \) -prune -false -o -type d -print | sed 's/^/  /'

echo ""
echo "📄 NØKKELFILER – FØRSTE 30 LINJER ELLER MINDRE:"
echo ""

find . -type f \( \
-iname "*.svelte" -o -iname "*.ts" -o -iname "*.js" -o -iname "*.json" -o \
-iname "*.html" -o -iname "*.md" -o -iname "*.css" -o -name ".env" -o -name ".env.local" \
\) ! -path "*/node_modules/*" ! -path "*/.git/*" ! -path "*/dist/*" ! -path "*/.svelte-kit/*" \
-print0 | while IFS= read -r -d '' file; do
  echo ""
  echo "===== START ${file} ====="
  head -n 30 "$file"
  echo "===== SLUTT ${file} ====="
done
) > prosjektoversikt.txt
