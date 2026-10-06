import os
import win32com.client

def apply_animations():
    pptx_path = os.path.abspath("Personal_Portfolio_Website_Presentation.pptx")
    pdf_path = os.path.abspath("Personal_Portfolio_Website_Presentation.pdf")
    
    if not os.path.exists(pptx_path):
        print(f"Error: {pptx_path} not found.")
        return

    print("Opening PowerPoint application...")
    ppt = win32com.client.Dispatch("PowerPoint.Application")
    ppt.Visible = True

    pres = ppt.Presentations.Open(pptx_path)
    slide_count = pres.Slides.Count
    print(f"Total slides in presentation: {slide_count}")

    # Verified PowerPoint COM slide transition effect IDs:
    # 770: Fade Smoothly, 1537: Push Left, 1285: Cover Left, 1287: Cover Up, 1793: Uncover, 769: Fade
    effects = [770, 1537, 1287, 1285, 770, 1537, 1287, 1285, 1793, 770]

    for i in range(1, slide_count + 1):
        slide = pres.Slides(i)
        effect_id = effects[(i - 1) % len(effects)]
        
        # Configure slide transition
        trans = slide.SlideShowTransition
        trans.EntryEffect = effect_id
        trans.Duration = 1.0 # 1 second smooth transition
        trans.AdvanceOnClick = True
        
        print(f"Applied transition effect {effect_id} to Slide {i}")

    # Save presentation with animations
    pres.Save()
    print("Saved PowerPoint presentation with slide transitions successfully.")

    # Re-export to PDF
    pres.SaveAs(pdf_path, 32)
    print("Re-exported PDF version successfully.")

    pres.Close()
    ppt.Quit()
    print("PowerPoint animation update complete!")

if __name__ == "__main__":
    apply_animations()
