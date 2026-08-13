#!/bin/bash
echo "Iniciando compilación de archivos Markdown a PDF nativa sin headers (Chrome + Pandoc)..."

cd "/Users/martinsanchez/Documents/Antigravity/Pagina web/pdf" || exit 1

for file in cv_martin_sanchez.md cv_martin_sanchez_en.md cv_martin_sanchez_es.md; do
  echo "Procesando $file ..."
  base="${file%.md}"
  pandoc -s -c cv_print.css "$file" -o "temp_${base}.html"
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --print-to-pdf="${base}.pdf" --no-pdf-header-footer "temp_${base}.html" 2>/dev/null
  rm "temp_${base}.html"
done

echo "¡Todos los PDFs han sido generados exitosamente y sin marcas de agua!"
