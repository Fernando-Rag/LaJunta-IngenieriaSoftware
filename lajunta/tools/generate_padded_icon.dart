import 'dart:io';
import 'package:image/image.dart' as img;

/// Genera un PNG 1024x1024 con la imagen original centrada y con margen.
/// Evita funciones que han cambiado entre versiones usando operaciones básicas.
/// Uso:
///   dart run tools/generate_padded_icon.dart assets/images/logo.png assets/images/app_logo_padded.png
void main(List<String> args) {
  if (args.length < 2) {
    stderr.writeln('Uso: dart run tools/generate_padded_icon.dart <input> <output>');
    exit(64);
  }
  final inputPath = args[0];
  final outputPath = args[1];

  final inputFile = File(inputPath);
  if (!inputFile.existsSync()) {
    stderr.writeln('No existe el archivo de entrada: $inputPath');
    exit(1);
  }

  final original = img.decodeImage(inputFile.readAsBytesSync());
  if (original == null) {
    stderr.writeln('Formato de imagen no soportado o corrupto.');
    exit(1);
  }

  const canvasSize = 1024; // Lienzo final cuadrado
  const targetLogoWidthPercent = 0.68; // Ajusta para más/menos margen (0.60-0.70 típico)

  // Crear lienzo transparente manualmente
  final canvas = img.Image(width: canvasSize, height: canvasSize); // Pixels default 0 (transparente)
  for (final p in canvas) { // Asegurar alfa 0
    p.a = 0;
  }

  // Calcular tamaño escalado manteniendo proporción
  final targetWidth = (canvasSize * targetLogoWidthPercent).round();
  final scale = targetWidth / original.width;
  final targetHeight = (original.height * scale).round();

  final resized = img.copyResize(original, width: targetWidth, height: targetHeight);

  // Coordenadas para centrar
  final dx = ((canvasSize - targetWidth) / 2).round();
  final dy = ((canvasSize - targetHeight) / 2).round();

  // Copiar píxeles manualmente (evita funciones eliminadas entre versiones)
  for (int y = 0; y < resized.height; y++) {
    for (int x = 0; x < resized.width; x++) {
      final sp = resized.getPixel(x, y);
      final tx = dx + x;
      final ty = dy + y;
      // setPixel en v4 escribe el valor ARGB
      canvas.setPixel(tx, ty, sp);
    }
  }

  final png = img.encodePng(canvas);
  File(outputPath).writeAsBytesSync(png);
  stdout.writeln('Generado: $outputPath');
  stdout.writeln('Ajusta targetLogoWidthPercent dentro del script para más margen.');
}
