# This script tries to find all Node.exe processes that are being debugged and kills them

$processes = @(Get-WmiObject Win32_Process -Filter "Caption = 'node.exe' AND CommandLine LIKE '%--inspect-brk%'")
foreach ($process in $processes) {
    $nodePid = $process.ProcessId
    echo "Killing node.exe process $nodePid"
    Get-Process -Id $nodePid | Stop-Process -Force
}