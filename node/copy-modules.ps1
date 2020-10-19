# Copies sabio modules into node_modules if needed. 
clear
$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
cd $dir

# npm link ./sabio_modules/sabio-routing

Copy-Item .\sabio_modules\** -Recurse .\node_modules