dim message
dim number

set objFile=CreateObject("Scripting.FileSystemObject").OPenTextFile("number.txt",1)
do while not objFile.AtEndOfStream
number=objFile.ReadLine()
	message=URLEncode("http://13.127.164.220:3000/upload_images/profile/903956272930_2.PNG")
	set shell=WScript.CreateObject("WScript.Shell")
	shell.run("https://wa.wai.me/919624451035")
	WScript.sleep(10000)
	shell.SendKeys "{ENTER}"
	WScript.sleep(5000)
	shell.SendKeys "^w"
Loop
objFile.close


Public Function URLEncode( StringVal )
  Dim i, CharCode, Char, Space
  Dim StringLen
  StringLen = Len(StringVal)
  ReDim result(StringLen)

  Space = "+"
  'Space = "%20"

  For i = 1 To StringLen
    Char = Mid(StringVal, i, 1)
    CharCode = AscW(Char)
    If 97 <= CharCode And CharCode <= 122 _
    Or 64 <= CharCode And CharCode <= 90 _
    Or 48 <= CharCode And CharCode <= 57 _
    Or 45 = CharCode _
    Or 46 = CharCode _
    Or 95 = CharCode _
    Or 126 = CharCode Then
      result(i) = Char
    ElseIf 32 = CharCode Then
      result(i) = Space
    Else
      result(i) = "&#" & CharCode & ";"
    End If
  Next
  URLEncode = Join(result, "")
End Function