import os
import xml.etree.ElementTree as ET
from datetime import datetime

# 独立域名配置
BASE_URL = "https://panorama-sg.com"
SITEMAP_FILE = "sitemap.xml"

def generate_sitemap():
    # 创建 XML 根节点
    urlset = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")

    # 遍历当前目录及子目录下的 HTML 文件
    for root, dirs, files in os.walk("."):
        # 排除版本控制和非公开目录
        if ".git" in root or ".github" in root:
            continue

        for file in files:
            if file.endswith(".html"):
                filepath = os.path.join(root, file)
                url_path = filepath.replace("\\", "/").replace("./", "")

                # 规范化 URL 路径
                if url_path == "index.html":
                    url_path = ""
                elif url_path.endswith("/index.html"):
                    url_path = url_path.replace("/index.html", "")

                full_url = f"{BASE_URL}/{url_path}".rstrip('/')

                # 获取文件最后修改时间
                try:
                    mtime = os.path.getmtime(filepath)
                    lastmod = datetime.fromtimestamp(mtime).strftime('%Y-%m-%d')
                except Exception:
                    lastmod = datetime.now().strftime('%Y-%m-%d')

                # 构建 XML 元素
                url_element = ET.SubElement(urlset, "url")
                loc = ET.SubElement(url_element, "loc")
                loc.text = full_url
                lastmod_element = ET.SubElement(url_element, "lastmod")
                lastmod_element.text = lastmod

    # 生成并格式化 XML 文件 (适用于 Python 3.9+)
    tree = ET.ElementTree(urlset)
    try:
        ET.indent(tree, space="  ", level=0)
    except AttributeError:
        pass # 兼容低版本 Python

    tree.write(SITEMAP_FILE, encoding="utf-8", xml_declaration=True)
    print(f"Sitemap successfully generated at {SITEMAP_FILE}")

if __name__ == "__main__":
    generate_sitemap()
