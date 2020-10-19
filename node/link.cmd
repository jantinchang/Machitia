@echo off
cd node_modules


:link
echo Linking...
mklink /d sabio-data ..\sabio_modules\sabio-data
mklink /d sabio-models ..\sabio_modules\sabio-models
mklink /d sabio-routing ..\sabio_modules\sabio-routing
mklink /d sabio-services ..\sabio_modules\sabio-services
mklink /d sabio-web ..\sabio_modules\sabio-web
mklink /d sabio-web-models ..\sabio_modules\sabio-web-models

:getout

echo Leaving...