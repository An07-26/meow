import sass
import time
import os

# 定義路徑
SCSS_FILE = 'scss/style.scss'
CSS_FILE = 'css/style.css'

def compile_sass():
    try:
        # 將 SCSS 編譯成標準 CSS (並設定排版風格為壓縮或展開)
        css_content = sass.compile(filename=SCSS_FILE, output_style='expanded')
        
        # 確保輸出的目錄存在
        os.makedirs(os.path.dirname(CSS_FILE), exist_ok=True)
        
        # 寫入檔案
        with open(CSS_FILE, 'w', encoding='utf-8') as f:
            f.write(css_content)
            
        print(f"[{time.strftime('%H:%M:%S')}] 喵！編譯成功！")
    except Exception as e:
        print(f"編譯失敗，檢查一下語法：\n{e}")

# 簡單的監控邏輯
print("Sass 監控中... (按下 Ctrl+C 停止)")
last_mtime = 0

while True:
    try:
        # 檢查檔案最後修改時間
        current_mtime = os.path.getmtime(SCSS_FILE)
        if current_mtime != last_mtime:
            compile_sass()
            last_mtime = current_mtime
        time.sleep(1) # 每秒檢查一次
    except KeyboardInterrupt:
        break