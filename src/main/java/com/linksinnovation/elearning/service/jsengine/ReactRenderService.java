package com.linksinnovation.elearning.service.jsengine;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import jdk.nashorn.api.scripting.NashornScriptEngine;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

/**
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
@Service
public class ReactRenderService {

    private static NashornScriptEngine engine;

    @PostConstruct
    private void init() {
        engine = (NashornScriptEngine) new ScriptEngineManager().getEngineByName("nashorn");
        try {
            engine.eval(getFile("jsengine/nashorn-polyfill.js"));
            System.out.println("====> Initializer NashornScriptEngine  " + new Date());
        } catch (ScriptException ex) {
            Logger.getLogger(ReactRenderService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private Reader getFile(String path) {
        InputStream inputStream = null;
        try {
            inputStream = new ClassPathResource(path).getInputStream();
        } catch (IOException ex) {
            Logger.getLogger(ReactRenderService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return new InputStreamReader(inputStream);
    }

    public String render(String function, Object... value) {
        try {
            Object result = engine.invokeFunction("print", value);
            return String.valueOf(result);
        } catch (ScriptException | NoSuchMethodException ex) {
            Logger.getLogger(ReactRenderService.class.getName()).log(Level.SEVERE, null, ex);
            throw new IllegalStateException("Failed to render", ex);
        }
    }
}
