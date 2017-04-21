/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.utils.ppt2pdf;

import com.itextpdf.awt.PdfGraphics2D;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfWriter;
import java.awt.Dimension;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import org.apache.poi.xslf.usermodel.XMLSlideShow;
import org.apache.poi.xslf.usermodel.XSLFSlide;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
public class Ppt2Pdf {
    public static void convert(FileInputStream inputStream,FileOutputStream out) throws IOException, DocumentException{
        XMLSlideShow ppt = new XMLSlideShow(inputStream);
        inputStream.close();
        Dimension pgsize = ppt.getPageSize();

        Document document = new Document();
        PdfWriter pdfWriter = PdfWriter.getInstance(document, out);
        document.setPageSize(new Rectangle((float) pgsize.getWidth(), (float) pgsize.getHeight()));
        document.open();
        for (XSLFSlide slide : ppt.getSlides()) {
            System.out.println(pgsize.getWidth()+ " "+ pgsize.getHeight());
            PdfGraphics2D graphics = (PdfGraphics2D) pdfWriter.getDirectContent().createGraphics((float) pgsize.getWidth(), (float) pgsize.getHeight());
            slide.draw(graphics);
            graphics.dispose();
            document.newPage();
        }
        document.close();
    }
}
