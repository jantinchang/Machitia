clear
$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
cd $dir
npm link ./sabio_modules/sabio-web 
npm link ./sabio_modules/sabio-web-models
npm link ./sabio_modules/sabio-services 
npm link ./sabio_modules/sabio-data
npm link ./sabio_modules/sabio-models 
npm link ./sabio_modules/sabio-routing