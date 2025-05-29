from PIL import Image
import os

def optimize_image(input_path, output_path, size=None, quality=85):
    """بهینه‌سازی تصویر با اندازه و کیفیت مشخص"""
    try:
        with Image.open(input_path) as img:
            if size:
                img = img.resize(size, Image.Resampling.LANCZOS)
            img.save(output_path, quality=quality, optimize=True)
        print(f"تصویر با موفقیت در {output_path} ذخیره شد")
    except Exception as e:
        print(f"خطا در پردازش تصویر: {e}")

def create_about_image():
    """ایجاد تصویر اصلی درباره ما"""
    input_path = "asset/img/transformer-oil-filtration.jpg"
    output_path = "asset/img/about/about-main.jpg"
    optimize_image(input_path, output_path, size=(800, 600))

def create_team_images():
    """ایجاد تصاویر تیم"""
    input_path = "asset/img/transformer-oil-filtration.jpg"
    # ایجاد تصاویر مختلف برای اعضای تیم با برش‌های متفاوت
    team_images = [
        ("asset/img/team/team-1.jpg", (0, 0, 800, 800)),
        ("asset/img/team/team-2.jpg", (400, 0, 1200, 800))
    ]
    
    for output_path, crop_box in team_images:
        try:
            with Image.open(input_path) as img:
                cropped = img.crop(crop_box)
                cropped = cropped.resize((400, 400), Image.Resampling.LANCZOS)
                cropped.save(output_path, quality=85, optimize=True)
            print(f"تصویر تیم با موفقیت در {output_path} ذخیره شد")
        except Exception as e:
            print(f"خطا در پردازش تصویر تیم: {e}")

def create_certificate_images():
    """ایجاد تصاویر گواهینامه‌ها"""
    # ایجاد تصاویر ساده برای گواهینامه‌ها
    certificates = [
        ("asset/img/certificates/iso-9001.png", (255, 215, 0)),  # رنگ طلایی
        ("asset/img/certificates/iso-14001.png", (0, 128, 0)),   # رنگ سبز
        ("asset/img/certificates/ohsas.png", (0, 0, 255))        # رنگ آبی
    ]
    
    for output_path, color in certificates:
        try:
            img = Image.new('RGB', (300, 300), color)
            img.save(output_path, quality=95, optimize=True)
            print(f"تصویر گواهینامه با موفقیت در {output_path} ذخیره شد")
        except Exception as e:
            print(f"خطا در ایجاد تصویر گواهینامه: {e}")

if __name__ == "__main__":
    # ایجاد پوشه‌های مورد نیاز
    os.makedirs("asset/img/about", exist_ok=True)
    os.makedirs("asset/img/team", exist_ok=True)
    os.makedirs("asset/img/certificates", exist_ok=True)
    
    # ایجاد تصاویر
    create_about_image()
    create_team_images()
    create_certificate_images() 