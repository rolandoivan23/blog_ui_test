import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class PostsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    
    
    async createComment(commentText: string, post: Locator) {
        await post.getByPlaceholder('Share your thoughts...').waitFor({state: 'attached'});
        await post.getByPlaceholder('Share your thoughts...').fill(commentText);
        await post.getByText('Post Comment').click();
        await expect(this.page.getByText(commentText).first()).toBeVisible();
    }   
    
    async getPostId(post: Locator): Promise<number>{   
        const commentForm = post.locator('.comment-form form');
        const commentAction = await commentForm.getAttribute('action');
        if (!commentAction) {
            throw new Error("Comment form action attribute is missing");
        }
        const postId = commentAction.split('/')[2];
        return parseInt(postId);
    }

    async findPost(name: string): Promise<Locator>{
        const post = this.page.locator('.post-content').filter({ hasText: name });
        await expect(post).toBeVisible();
        return post;
    }

    async validateCommentsCreationAtHome(commentText: string, post: Locator) {
        this.createComment(commentText, post);
    }
    
    async validateCommentsCreationAtShow(commentText: string, post: Locator) {
        //Este goto es necesario para que pueda encontrar los elementos para cuando se navega a la vista de show
        //de un post desde la vista de home, ya que se usa hotwire para cargar los elementos
        //y no se recarga la pagina y por lo tanto sigue encontrando mas de un elemento
        await this.page.goto(this.env['BASE_URL'] + '/posts/' + await this.getPostId(post));
        await this.createComment(commentText, post);
    }
    
    async validatePostElements(name: string) {
        const post = await this.findPost(name);
    
        await expect(post.getByRole('link', {name: 'Show More'})).toBeVisible();
        const commentsTitle = post.locator('.comments-title');
        await expect(commentsTitle).toBeVisible();
        await expect(commentsTitle).toContainText('Comments');
        await expect(post.locator('.comments-count')).toBeVisible();
        await expect(post.getByPlaceholder('Share your thoughts...')).toBeVisible();
        await expect(post.getByText('Post Comment')).toBeVisible();
    }
}
