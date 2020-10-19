# This file is a hack that enables .eslintrc in a create-react-app in dev mode on Windows 10.
# Written and tested against react-scripts@2.0.5
#
# Make sure you replace the default "start" script in package.json with:
# "start": "PowerShell.exe \"%CD%\\enable-eslintrc.ps1\" && react-scripts start",

$file = "node_modules\react-scripts\config\webpack.config.js"
(Get-Content $file) -replace "useEslintrc: false", "useEslintrc: true" | Set-Content $file
