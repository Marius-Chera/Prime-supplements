# Trimite o intrebare la Google Gemini (API) si afiseaza raspunsul.
# Cheia se citeste din variabila Windows GEMINI_API_KEY (proiect "Default Gemini Project", Free tier) si nu se afiseaza niciodata.
# Folosire:  powershell -NoProfile -File intreaba-gemini.ps1 "intrebarea" [-Model gemini-3.5-flash]
param(
  [Parameter(Mandatory = $true, Position = 0)][string]$Intrebare,
  [string]$Model = 'gemini-3.5-flash',
  [string[]]$Rezerve = @('gemini-3.5-flash-lite', 'gemini-flash-latest')
)
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [Text.Encoding]::UTF8

$k = [Environment]::GetEnvironmentVariable('GEMINI_API_KEY', 'User')
if (-not $k) { Write-Error 'Lipseste GEMINI_API_KEY. Ruleaza "Salveaza cheia Gemini.cmd" dupa ce copiezi cheia din AI Studio.'; exit 1 }

$body = @{ contents = @(@{ parts = @(@{ text = $Intrebare }) }) } | ConvertTo-Json -Depth 6 -Compress
$bytes = [Text.Encoding]::UTF8.GetBytes($body)

foreach ($m in @($Model) + $Rezerve) {
  try {
    $r = Invoke-RestMethod -TimeoutSec 120 -Method Post `
      -Uri "https://generativelanguage.googleapis.com/v1beta/models/$($m):generateContent" `
      -Headers @{ 'x-goog-api-key' = $k } -ContentType 'application/json; charset=utf-8' -Body $bytes
    $text = ($r.candidates[0].content.parts | ForEach-Object { $_.text }) -join ''
    Write-Output "[$m]"
    Write-Output $text
    exit 0
  } catch {
    # 503 = suprasolicitat, 429 = limita planului gratuit -> incearca modelul urmator
    Write-Warning "$m a esuat: $($_.Exception.Message)"
  }
}
exit 2
