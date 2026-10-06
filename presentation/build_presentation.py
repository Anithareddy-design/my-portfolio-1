import os
import win32com.client
from pptx import Presentation
from pptx.util import Inches

def build_pptx():
    pptx_filename = "Personal_Portfolio_Website_Presentation.pptx"
    pdf_filename = "Personal_Portfolio_Website_Presentation.pdf"
    
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6] # blank layout
    
    for i in range(1, 11):
        slide = prs.slides.add_slide(blank_layout)
        img_path = os.path.abspath(f"slide_{i}.png")
        if os.path.exists(img_path):
            slide.shapes.add_picture(img_path, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
        else:
            print(f"Warning: {img_path} not found!")
            
    prs.save(pptx_filename)
    print(f"Saved {pptx_filename} successfully!")
    
    # Export to PDF via PowerPoint COM
    try:
        powerpoint = win32com.client.Dispatch("PowerPoint.Application")
        powerpoint.Visible = True # Required by some PowerPoint COM methods
        
        abs_pptx = os.path.abspath(pptx_filename)
        abs_pdf = os.path.abspath(pdf_filename)
        
        presentation = powerpoint.Presentations.Open(abs_pptx)
        # 32 = ppSaveAsPDF
        presentation.SaveAs(abs_pdf, 32)
        presentation.Close()
        powerpoint.Quit()
        print(f"Successfully converted to PDF: {pdf_filename}")
    except Exception as e:
        print(f"PowerPoint COM conversion note: {e}")

if __name__ == "__main__":
    build_pptx()
