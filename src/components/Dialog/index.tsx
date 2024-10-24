import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useState } from "react";

export function DialogDemo() {
    const [imagePreview, setImagePreview] = useState(null);

    const submitSchema = Yup.object({
        title: Yup.string().required("Please enter post title"),
        content: Yup.string().required("Please enter post content"),
        tags: Yup.string().min(2).required("Please enter post tag"),
        image: Yup.mixed().required("Please upload a post image"),
    });

    const initialValues = {
        title: '',
        content: '',
        tags: '',
        image: null,
    };

    const { values, handleBlur, handleChange, handleSubmit, errors, setFieldValue } = useFormik({
        initialValues,
        validationSchema: submitSchema,
        onSubmit: (values, actions) => {
            console.log(values);
            actions.resetForm();
            setImagePreview(null);
        }
    });

    const handleFileChange = (e) => {
        const file = e.currentTarget.files[0];
        if (file) {
            setFieldValue("image", file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="pb-5">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Create Post</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create post</DialogTitle>
                    </DialogHeader>

                    <form className="flex flex-col gap-4 py-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col items-start gap-4">
                            <Label htmlFor="title" className="text-right">
                                Post title
                            </Label>
                            <Input
                                id="title"
                                placeholder="Type here..."
                                className="col-span-3"
                                name="title"
                                value={values.title}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {errors.title && <p className="text-red-600">{errors.title}</p>}
                        </div>

                        <div className="flex flex-col items-start gap-4">
                            <Label htmlFor="content" className="text-right">
                                Post content
                            </Label>
                            <Input
                                id="content"
                                placeholder="Type here..."
                                className="col-span-3"
                                name="content"
                                value={values.content}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {errors.content && <p className="text-red-600">{errors.content}</p>}
                        </div>

                        <div className="flex flex-col items-start gap-4">
                            <Label htmlFor="tags" className="text-right">
                                Post tags
                            </Label>
                            <Input
                                id="tags"
                                placeholder="Type here..."
                                className="col-span-3"
                                name="tags"
                                value={values.tags}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {errors.tags && <p className="text-red-600">{errors.tags}</p>}
                        </div>

                        <div className="flex flex-col items-start gap-4">
                            <Label htmlFor="image" className="text-right">
                                Post image
                            </Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                className="col-span-3"
                                onChange={handleFileChange}
                            />
                            {errors.image && <p className="text-red-600">{errors.image}</p>}
                            {imagePreview && (
                                <img src={imagePreview} alt="Image Preview" className="mt-2 w-[100px] h-[100px]" />
                            )}
                        </div>
                    </form>
                    <DialogFooter className="flex gap-2">
                        <Button type="submit" onClick={handleSubmit}>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
