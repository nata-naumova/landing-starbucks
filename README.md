# aroma-landing page

[![Live Demo](https://img.shields.io/badge/✨_Live_Demo=for-the-badge)](https://landing-starbucks-liart.vercel.app/)

Арома - это магазин который предоставляет широкий ассортимент бодрящего кофе. Данный проект является главной страницей сайта, который в будущем можно расширить до интернет магазина.

## 📋 Оглавление

- [Технологии](#-технологии)
- [Установка](#-установка)
- [Структура проекта](#-cтруктура-проекта)
- [Возможности](#-возможности)

## 🚀 Технологии
```
Frontend/
├── Html           # разметка страницы
├── Css            # стилизация проекта
├── Js             # скрипты

Animation/
├── Gsap           # библиотека для анимации

Icons/
├── Lucide         # иконки

```

## ⚙️ Установка

#### Шаги установки

```bash
# Клонирование репозитория
git clone https://github.com/nata-naumova/landing-starbucks.git
cd landing-starbucks

# Локальный предпросмотр
index.html         # запуск файла

```

## 📂 Структура проекта

```
landing-starbucks/
├── images/             # Изображения
├── scripts/
│   ├── plugins/        # плагины для gsap бибилиотеки
│   ├── cart.js         # 
│   ├── constants.js    # Константы проекта
│   └── gsap.min.js     #
│   └── script.js       # Главный файл скриптов
│   └── slider.js       #
│   └── smoothScroll.js #
├── styles/             
│   ├── base/           # Базовые стили (глобальные/сбросы/переменные)
│   │   └── _global.css  
│   │   └── _reset.css
│   │   └── _variables.css
│   └── components/     # Базовые UI компоненты
│   │   └── _buttons.css     
│   │   └── _card.css        
│   │   └── _footer.css      
│   │   └── _header.css      
│   │   └── _heading.css     
│   │   └── _menu.css        
│   │   └── _modal.css       
│   └── sections/       # Стили по секциям
│   │   └── _about.css       
│   │   └── _catalog.css     
│   │   └── _contacts.css    
│   │   └── _events.css      
│   │   └── _hero.css        
│   │   └── _shop.css        
│   │   └── _testimonials.css
│   └── style.css        # Главный файл стилей
├── index.html           # Корневой компонент с разметкой страницы
└── README.md            # 

```

## ✨ Возможности

```bash
# Навигация
- навигация по сайту с помощью пунктов меню

# Слайдер
- слайдер отзывов на gsap

![Демо desktop](/images/демо-фулл.gif)
![Демо mobile](/images/демо-мини.gif)

```
