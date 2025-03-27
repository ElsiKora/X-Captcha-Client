# Reference

## Challenge

<details><summary><code>client.challenge.<a href="/src/api/resources/challenge/client/Client.ts">challengeControllerSolve</a>(challenge, { ...params }) -> ElsiKoraApi.ChallengeSolveResponseBodyDto</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This method is used for solving `Challenge`

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.challenge.challengeControllerSolve("ee2e5799-8df3-4a80-bed0-25f30abbe744", {
    solution: {
        type: "click",
        data: true,
    },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**challenge:** `string` — Challenge identifier

</dd>
</dl>

<dl>
<dd>

**request:** `ElsiKoraApi.ChallengeSolveRequestBodyDto`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Challenge.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.challenge.<a href="/src/api/resources/challenge/client/Client.ts">challengeControllerVerify</a>(challenge, { ...params }) -> ElsiKoraApi.ChallengeVerifyResponseBodyDto</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This method is used for verifying `Challenge`

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.challenge.challengeControllerVerify("b6e1c18f-6099-4d29-bf72-45a8a1f2fbfb", {
    token: "44a846cc-0813-4d8d-b608-f8e8887a8b74",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**challenge:** `string` — Challenge identifier

</dd>
</dl>

<dl>
<dd>

**request:** `ElsiKoraApi.ChallengeVerifyRequestBodyDto`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Challenge.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.challenge.<a href="/src/api/resources/challenge/client/Client.ts">challengeControllerCreate</a>({ ...params }) -> ElsiKoraApi.ChallengeCreateResponseDto</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This method is used for creating `Challenge`

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.challenge.challengeControllerCreate({
    type: "click",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `ElsiKoraApi.ChallengeCreateBodyDto`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Challenge.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.challenge.<a href="/src/api/resources/challenge/client/Client.ts">challengeControllerGet</a>(id) -> ElsiKoraApi.ChallengeGetResponseDto</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This method is used for fetching `Challenge`

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.challenge.challengeControllerGet("09beb345-10e8-4254-8913-2a86dc4632a8");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Challenge identifier

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Challenge.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>
