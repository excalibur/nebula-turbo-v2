package com.duobei.forester.web.helper;

import org.springframework.ui.Model;

/**
 * 工具类
 *
 * 主要辅助信息设置
 *
 * @author faith
 * @since 0.0.1
 */
public class MsgHelper {

    /**
     * 禁用构造函数
     */
    private MsgHelper(){

    }

    /**
     * 初始化状态
     * @param model
     */
    public static void setup(Model model) {
        model.addAttribute("error", false);
        model.addAttribute("success", false);
        model.addAttribute("alert", false);
        model.addAttribute("info", false);
    }

    public static void addError(String message, Model model) {
        model.addAttribute("error", true);
        model.addAttribute("errorMessage", message);
    }

    public static void addSuccess(String message, Model model) {
        model.addAttribute("success", true);
        model.addAttribute("successMessage", message);
    }

    public static void addAlert(String message, Model model) {
        model.addAttribute("alert", true);
        model.addAttribute("alertMessage", message);
    }

    public static void addInfo(String message, Model model) {
        model.addAttribute("info", true);
        model.addAttribute("infoMessage", message);
    }


}
