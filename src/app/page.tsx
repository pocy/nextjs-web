"use client"

import { useState, useCallback, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Copy, RefreshCw, Shield } from "lucide-react"

export default function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState([12])
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copied, setCopied] = useState(false)

  const generatePassword = useCallback(() => {
    let charset = ""
    
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"
    
    if (charset === "") {
      setPassword("")
      return
    }
    
    let result = ""
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    
    setPassword(result)
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  // 初始生成密码
  useEffect(() => {
    generatePassword()
  }, [])

  // 当设置改变时重新生成密码
  useEffect(() => {
    generatePassword()
  }, [generatePassword])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="container mx-auto py-8 md:py-16 max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              密码生成器
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            生成安全、随机的密码来保护您的账户
          </p>
        </div>

        <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">自定义密码设置</CardTitle>
            <CardDescription className="text-center">
              调整以下选项来生成符合您需求的密码
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* 生成的密码显示 */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                生成的密码
              </label>
              <div className="flex gap-2">
                <Input
                  value={password}
                  readOnly
                  className="font-mono text-lg bg-gray-50 dark:bg-gray-900 border-2"
                  placeholder="点击生成密码..."
                />
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  disabled={!password}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              {copied && (
                <p className="text-green-600 dark:text-green-400 text-sm">
                  密码已复制到剪贴板！
                </p>
              )}
            </div>

            {/* 密码长度滑块 */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  密码长度
                </label>
                <span className="text-sm font-mono bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                  {length[0]}
                </span>
              </div>
              <Slider
                value={length}
                onValueChange={setLength}
                max={50}
                min={4}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>4</span>
                <span>50</span>
              </div>
            </div>

            {/* 字符类型选项 */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                包含字符类型
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">大写字母</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">A-Z</span>
                  </div>
                  <Switch
                    checked={includeUppercase}
                    onCheckedChange={setIncludeUppercase}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">小写字母</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">a-z</span>
                  </div>
                  <Switch
                    checked={includeLowercase}
                    onCheckedChange={setIncludeLowercase}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">数字</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">0-9</span>
                  </div>
                  <Switch
                    checked={includeNumbers}
                    onCheckedChange={setIncludeNumbers}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">特殊字符</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">!@#$%^&*</span>
                  </div>
                  <Switch
                    checked={includeSymbols}
                    onCheckedChange={setIncludeSymbols}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>
              </div>
            </div>

            {/* 生成按钮 */}
            <Button
              onClick={generatePassword}
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              disabled={!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols}
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              重新生成密码
            </Button>
            
            {!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols && (
              <p className="text-amber-600 dark:text-amber-400 text-sm text-center">
                请至少选择一种字符类型
              </p>
            )}
          </CardContent>
        </Card>

        {/* 安全提示 */}
        <Card className="mt-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                  安全提示
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• 建议使用12位以上的密码</li>
                  <li>• 包含多种字符类型提高安全性</li>
                  <li>• 不要在多个网站使用相同密码</li>
                  <li>• 定期更换重要账户密码</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
