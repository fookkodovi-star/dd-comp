#!/bin/bash

# Быстрые команды для Tree Component проекта

echo "🌳 Tree Component - Быстрые команды"
echo ""

# Функция помощи
show_help() {
    echo "Доступные команды:"
    echo ""
    echo "  install     - Установить зависимости"
    echo "  dev         - Запустить dev-сервер"
    echo "  build       - Собрать для продакшена"
    echo "  preview     - Предпросмотр сборки"
    echo "  check       - Проверить TypeScript типы"
    echo "  clean       - Очистить node_modules и dist"
    echo "  info        - Показать информацию о проекте"
    echo "  docs        - Открыть документацию"
    echo "  help        - Показать эту справку"
    echo ""
}

# Установка зависимостей
install() {
    echo "📦 Установка зависимостей..."
    npm install
}

# Запуск dev-сервера
dev() {
    echo "🚀 Запуск dev-сервера..."
    npm run dev
}

# Сборка
build() {
    echo "🔨 Сборка проекта..."
    npm run build
}

# Предпросмотр
preview() {
    echo "👀 Предпросмотр сборки..."
    npm run preview
}

# Проверка типов
check() {
    echo "🔍 Проверка TypeScript типов..."
    npm run type-check
}

# Очистка
clean() {
    echo "🧹 Очистка проекта..."
    rm -rf node_modules dist
    echo "✅ Очистка завершена"
}

# Информация о проекте
info() {
    echo "📊 Информация о проекте:"
    echo ""
    echo "Компонент: Tree (MUI X Tree View)"
    echo "Версия: 1.0.0"
    echo "Файлов компонента: 8"
    echo "Строк кода: 1,426"
    echo "Документация: 13 файлов (3,000+ строк)"
    echo "Примеров: 4"
    echo ""
    echo "Файлы проекта:"
    find /workspace -type f -not -path '*/.git/*' -not -path '*/node_modules/*' | wc -l
}

# Открыть документацию
docs() {
    echo "📚 Документация:"
    echo ""
    echo "Основная:"
    echo "  - README.md"
    echo "  - START_HERE.md"
    echo "  - QUICKSTART.md"
    echo ""
    echo "API:"
    echo "  - src/components/Tree/README.md"
    echo ""
    echo "Для разработчиков:"
    echo "  - DEVELOPER_GUIDE.md"
    echo "  - USAGE_PATTERNS.md"
    echo ""
}

# Главная логика
case "$1" in
    install)
        install
        ;;
    dev)
        dev
        ;;
    build)
        build
        ;;
    preview)
        preview
        ;;
    check)
        check
        ;;
    clean)
        clean
        ;;
    info)
        info
        ;;
    docs)
        docs
        ;;
    help|--help|-h|"")
        show_help
        ;;
    *)
        echo "❌ Неизвестная команда: $1"
        echo ""
        show_help
        exit 1
        ;;
esac
