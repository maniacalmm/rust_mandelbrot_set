use std::io;
use std::option::Option;
use rocket::http::RawStr;
use rocket::response::{NamedFile};
use std::{thread, time};

use crate::routes::mandel;
#[get("/")]
pub fn index() -> io::Result<NamedFile> {
    NamedFile::open("static/index.html")
}

#[get("/mandel?<ux>&<uy>&<lx>&<ly>&<w>&<h>")]
pub fn create_img(w: Option<&RawStr>,
              h: Option<&RawStr>,
              ux: Option<&RawStr>,
              uy: Option<&RawStr>,
              lx: Option<&RawStr>,
              ly: Option<&RawStr>
              ) -> String {

    mandel::generate_picture(
        ux.unwrap().to_string(),
        uy.unwrap().to_string(),
        lx.unwrap().to_string(),
        ly.unwrap().to_string(),
        w.unwrap().to_string(),
        h.unwrap().to_string(),
    )
}

