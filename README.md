# Movie Search

## Overview

This is a vanilla js SPA that displays movies info by user request.

#### DEMO - https://movie-search.aleksey-vl-ivanov.com

<div align="center">
<img src="https://user-images.githubusercontent.com/14129152/81660958-c9c2d300-947e-11ea-8c2b-85c5a6683dfb.png" width="400px">
</div>

## Features

- data are fetched from [OMDb API](http://www.omdbapi.com)
- poster images are preloaded before displaying
- adaptive slider
- smooth animation
- russian text is translated with [Multi-Translate public API](https://multi-translate-public-api.rekon.uk/docs) into English before search request
- virtual keyboard (EN/RU) can be used for medium(+) screens
- unit tests

## Dependencies

- vanilla js
- styling with [Bootstrap](https://bootswatch.com/cosmo/) (css only)
- icons from [Font Awesome](https://fontawesome.com/v4.7.0/)
- [Swiper](https://swiperjs.com) as a slider

## Install

```
$ git clone ...
$ cd movie-search
$ npm install
```

## Usage

```
$ npm run start
```

and open http://localhost:9000 in your browser, or

```
$ npm run build
```

and deploy somewhere your new **dist** folder.
