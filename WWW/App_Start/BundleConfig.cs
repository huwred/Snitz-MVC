﻿using System.Web;
using System.Web.Optimization;

namespace WWW
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            
            bundles.IgnoreList.Clear();
           
            bundles.Add(new ScriptBundle("~/bundles/corejs")
                        .Include("~/Scripts/jquery-2.1.4.js")
                        .Include("~/Scripts/jquery.cookie.js")
                        .Include("~/Scripts/jquery-ui.js")
                        .Include("~/Scripts/jquery.unobtrusive-ajax.js")
                        .Include("~/Scripts/jquery.highlight-5.js")
                        .Include("~/Scripts/jquery.validate.js")
                        .Include("~/Scripts/jquery.validate.unobtrusive.js")
                        .Include("~/Scripts/jquery-ui-timepicker-addon.js")
                        .Include("~/Scripts/jquery.timeago.js")
                        .Include("~/Scripts/bootstrap.js")
                        .Include("~/Scripts/bootstrap-dialog.js")
                        .Include("~/Scripts/bootstrap-switch.js")
                        .Include("~/Scripts/bootstrap-tabcollapse.js")
                        .Include("~/Scripts/bootstrap-spinedit.js")
            );

            bundles.Add(new ScriptBundle("~/bundles/userprofile").Include(
                "~/Scripts/jquery.form.js",
                "~/Scripts/jquery.Jcrop.js",
                "~/Scripts/snitz.avatar.js"));

            bundles.Add(new ScriptBundle("~/bundles/post").Include(
                "~/Scripts/snitz.editor.js",
                "~/Scripts/snitz.upload.js"));

            bundles.Add(new ScriptBundle("~/bundles/Snitzjs")
                .Include("~/Scripts/snitz.jquery.js")
                .Include("~/Scripts/pwstrength.js")
                .Include("~/Scripts/jquery.grid-picker.js"));

            bundles.Add(new ScriptBundle("~/bundles/Persian")
                .Include("~/Scripts/persianNum.jquery-2.js")
                        .Include("~/Scripts/persian-rex.js"));

            bundles.Add(new ScriptBundle("~/bundles/oldIEBrowsersSupport").Include(
                    "~/Scripts/respond.js",
                    "~/Scripts/html5shiv.js"));

            bundles.Add(new ScriptBundle("~/bundles/dropzonejs").Include(
                     "~/Scripts/dropzone.js"));

            //css files

            bundles.Add(new StyleBundle("~/bundles/sitecss").Include(
                            "~/Content/bootstrap-dialog.css",
                            "~/Content/bootstrap-switch.css",
                            "~/Content/bootstrap-spinedit.css",
                            "~/Content/bootstrap-responsive.css"
                            
                            ).Include("~/Content/font-awesome.css", new CssRewriteUrlTransformWrapper())
                            .Include("~/Content/animate.css")
                            .Include("~/Content/jquery.grid-picker.css")
                            .Include("~/Content/bootstrap.css")
                            .Include("~/Content/snitzlayout.css")
                            .Include("~/Content/dropzone.css"));

        }
    }
    public class CssRewriteUrlTransformWrapper : IItemTransform
    {
        public string Process(string includedVirtualPath, string input)
        {
            return new CssRewriteUrlTransform().Process("~" + VirtualPathUtility.ToAbsolute(includedVirtualPath), input);
        }
    }

}