import { ComipoAPIRequest } from "../comipo-api-request";
import { RequestParams } from "../web-request";

export class NewsAPI extends ComipoAPIRequest
{
    async getNews(requestParams?: RequestParams)
    {
        return await super.requestGet("/api/news", requestParams);
    }

    async getNew(news_id:string, requestParams?: RequestParams)
    {
        return await super.requestGet("/api/news/{news_id}".replace("{news_id}", news_id), requestParams);
    }

    async getInformation(requestParams?: RequestParams)
    {
        return await super.requestGet("/api/popups", requestParams);
    }
    
};