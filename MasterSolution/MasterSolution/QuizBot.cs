using System;
using Azure;
using Azure.AI.OpenAI;
using Newtonsoft.Json;

namespace MasterSolution
{
    public class QuizBot
    {
        string userPromt;
        
        public static async Task<Dictionary<string, object>> GetTopicsByPromtAsync(string userPrompt)
        {
            try
            {
                string Url = "https://aoai.hacktogether.net";
                string key = "261ddb62-6e19-49df-aaa2-71c4168432a9/smartdeys";

                Uri proxyUrl = new(Url + "/v1/api");

                AzureKeyCredential token = new(key);
                OpenAIClient openAIClient = new(proxyUrl, token);
                ChatCompletionsOptions completionOptions = new()
                {
                    MaxTokens = 2048,
                    Temperature = 0.7f,
                    NucleusSamplingFactor = 0.95f,
                    DeploymentName = "gpt-35-turbo"
                };

                var CustomPrompt = "Im going to create a puzzle application with you.I will ask you about anything you should give me a list of string in JSOn as response based on the promt .I will use that in my application.\r\n\r\nPrompt: \"Give me a list of related topics to prepare a quiz game. And the another promt is given by my user\".\r\n\r\nSuggest him/her some related topics .\r\nFormat : Json of Dictionary of string and object.\r\nThat ditionary contains \"Title\" and \"Topics\".\r\nTitle will be a string. {Eg: A small enocaging heading the start learning}\r\nTopic will be in list of string.{Based of this topic he will start learnging}.";
                completionOptions.Messages.Add(new ChatMessage(ChatRole.System, CustomPrompt + userPrompt));
                //completionOptions.Messages.Add(new ChatMessage(ChatRole.User, "hi there"));

                var response = await openAIClient.GetChatCompletionsAsync(completionOptions);
                Console.WriteLine("Generated text: " + response);

                var values = response.Value.Choices;
                var text = "";
                Dictionary<string, object> data = new Dictionary<string, object>();
                foreach (var choice in values)
                {
                    var message = choice.Message;
                    data = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, object>>(message.Content.ToString());
                    Console.WriteLine(message.Content);
                    Console.WriteLine("--");


                }
                return data;
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }

    
}
