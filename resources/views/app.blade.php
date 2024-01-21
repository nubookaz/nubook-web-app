<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <script>window.GoogleMapApi = "{{ config('services.google_maps.api_key') }}"; </script>
        <script>window.OpenWeatherApi = "{{ config('services.open_weather.api_key') }}"; </script>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="antialiased bg-black">
        @inertia
    </body>
</html>
