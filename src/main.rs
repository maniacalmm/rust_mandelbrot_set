#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use] extern crate rocket;

mod routes;
use crate::routes::{static_files, get};
fn main() {
    rocket::ignite()
    .mount("/", routes![
        static_files::file,
        get::index,
        get::create_img,
        get::create_img_options
        ])
    .launch();
}
