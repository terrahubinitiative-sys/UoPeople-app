from PIL import Image
import os

img_path = 'public/icons/logo.jpeg'
if os.path.exists(img_path):
    img = Image.open(img_path).convert('RGBA')
    
    # Make square with white background
    max_dim = max(img.size)
    square_img = Image.new('RGBA', (max_dim, max_dim), (255, 255, 255, 255))
    offset = ((max_dim - img.size[0]) // 2, (max_dim - img.size[1]) // 2)
    square_img.paste(img, offset, img)
    
    # Save standard PWA square icon sizes
    square_img.resize((192, 192)).save('public/icons/icon-192.png', 'PNG')
    square_img.resize((512, 512)).save('public/icons/icon-512.png', 'PNG')
    print("PNG icons created successfully!")
