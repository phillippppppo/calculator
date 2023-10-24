@echo off

for /f "delims=" %%y in ('npm run test 2^>^&1') do (
	echo %%y
)

